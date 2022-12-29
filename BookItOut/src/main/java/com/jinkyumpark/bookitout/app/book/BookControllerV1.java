package com.jinkyumpark.bookitout.app.book;

import com.jinkyumpark.bookitout.app.book.model.BookCategory;
import com.jinkyumpark.bookitout.app.book.model.BookLanguage;
import com.jinkyumpark.bookitout.app.book.model.BookSource;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.book.request.BookAddRequest;
import com.jinkyumpark.bookitout.app.book.request.BookEditRequest;
import com.jinkyumpark.bookitout.app.book.model.BookForm;
import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/book")
public class BookControllerV1 {
    private final MessageSourceAccessor messageSource;

    private BookService bookService;

    @GetMapping("{id}")
    public Book getBookById(@PathVariable("id") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getIsSharing() && !book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException(messageSource.getMessage("book.get.fail.not-sharing"));
        }

        return book;
    }

    @GetMapping("last")
    public Book getLastBook() {
        Long appUserId = AppUserService.getLoginAppUserId();
        return bookService.getLastBookByAppUserid(appUserId);
    }

    @GetMapping("all/{range}")
    public List<Book> getAllBooks(@PathVariable(value = "range", required = false) String range,
                                  @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                  @RequestParam(value = "size", required = false, defaultValue = "10") Integer size
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Pageable pageRequest = PageRequest.of(page, size, Sort.by("addDate").descending());

        if (range.equals("not-started")) return bookService.getAllNotStartedBook(loginUserId, pageRequest);
        if (range.equals("started")) return bookService.getAllStartedBook(loginUserId, pageRequest);
        if (range.equals("not-done")) return bookService.getAllNotDoneBook(loginUserId, pageRequest);
        if (range.equals("done")) return bookService.getAllDoneBook(loginUserId, pageRequest);
        if (range.equals("give-up")) return bookService.getAllGiveUpBook(loginUserId, pageRequest);

        return bookService.getAllBooks(loginUserId, pageRequest);
    }

    @GetMapping("current-reading-session")
    public Book getCurrentReadingSessionBook() {
        Long loginUserId = AppUserService.getLoginAppUserId();
        return bookService.getCurrentReadingSessionBook(loginUserId);
    }

    @PostMapping
    public AddSuccessResponse addBook(@RequestBody @Valid BookAddRequest bookAddRequest) {
        // TODO : Builder
        Book book = new Book();
        book.setTitle(bookAddRequest.getTitle());
        book.setAuthor(bookAddRequest.getAuthor());
        book.setEndPage(bookAddRequest.getEndPage());
        book.setSource(BookSource.valueOf(bookAddRequest.getSource()));
        book.setCover(bookAddRequest.getCover());
        book.setCategory(BookCategory.valueOf(bookAddRequest.getCategory()));
        book.setLanguage(BookLanguage.valueOf(bookAddRequest.getLanguage()));
        book.setIsSharing(bookAddRequest.getIsSharing());
        book.setForm(BookForm.valueOf(bookAddRequest.getForm()));

        Long loginUserId = AppUserService.getLoginAppUserId();
        AppUser appUser = new AppUser(loginUserId);
        book.setAppUser(appUser);

        bookService.addBook(book);

        return new AddSuccessResponse(messageSource.getMessage("book.add.success"));
    }

    @PutMapping("{id}")
    @Transactional
    public EditSuccessResponse editBook(@PathVariable("id") Long bookId, @RequestBody @Valid BookEditRequest bookEditRequest) {
        Book bookToEdit = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (! bookToEdit.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException();
        }

        if (bookEditRequest.getTitle() != null) {
            bookToEdit.setTitle(bookEditRequest.getTitle());
        }
        if (bookEditRequest.getCover() != null) {
            bookToEdit.setCover(bookEditRequest.getCover());
        }
        if (bookEditRequest.getSummary() != null) {
            bookToEdit.setSummary(bookEditRequest.getSummary());
        }
        if (bookEditRequest.getLanguage() != null) {
            bookToEdit.setLanguage(BookLanguage.valueOf(bookEditRequest.getLanguage()));
        }
        if (bookEditRequest.getSource() != null) {
            BookSource bookSource = BookSource.valueOf(bookEditRequest.getSource());
            bookToEdit.setSource(bookSource);
        }
        if (bookEditRequest.getReview() != null) {
            bookToEdit.setReview(bookEditRequest.getReview());
        }
        if (bookEditRequest.getIsSharing() != null) {
            bookToEdit.setIsSharing(bookEditRequest.getIsSharing());
        }
        if (bookEditRequest.getRating() != null) {
            bookToEdit.setRating(bookEditRequest.getRating());
        }

        return new EditSuccessResponse(String.format("PUT /v1/book/%d", bookId), messageSource.getMessage("book.update.success"));
    }

    @PutMapping("give-up/{bookId}")
    @Transactional
    public EditSuccessResponse giveUpBook(@PathVariable("bookId") Long bookId) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        Book book = bookService.getBookById(bookId);

        if (!book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException();
        }

        book.setIsGiveUp(true);

        return new EditSuccessResponse(String.format("v1/book/give-up/%d", bookId));
    }

    @PutMapping("un-give-up/{bookId}")
    @Transactional
    public EditSuccessResponse unGiveUpBook(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long longinUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(longinUserId)) {
            throw new NotAuthorizeException();
        }

        book.setIsGiveUp(false);

        return new EditSuccessResponse(String.format("v1/book/un-give-up/%d", bookId));
    }

    @DeleteMapping("{bookId}")
    public DeleteSuccessResponse deleteBook(@PathVariable("bookId") Long bookId) {
        bookService.deleteBookByBookId(bookId);

        return new DeleteSuccessResponse(String.format("DELETE /v1/book/%d", bookId), messageSource.getMessage("book.delete.success"));
    }
}