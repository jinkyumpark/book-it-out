package com.jinkyumpark.bookitout.app.book;

import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.app.readingsession.ReadingSession;
import com.jinkyumpark.bookitout.app.readingsession.ReadingSessionRepository;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class BookService {
    private BookRepository bookRepository;
    private ReadingSessionRepository readingSessionRepository;

    public Book getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("해당 ID의 책이 없어요"));

        return book;
    }

    public Book getLastBookByAppUserid(Long appUserId) {
        PageRequest pageRequest = PageRequest.of(0, 1);

        List<ReadingSession> readingSessionList = readingSessionRepository
                .findAllBookNotDoneReadingSession(appUserId, pageRequest);

        if (readingSessionList.size() < 1) {
            throw new NotFoundException("Last Reading Session not present; possible cause : never used book-it-out, last book read is done");
        }

        return readingSessionList.get(0).getBook();
    }

    public List<Book> getAllBooks(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllBooks(loginUserId, pageRequest);
    }

    public List<Book> getAllNotStartedBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllNotStartedBooks(loginUserId, pageRequest);
    }

    public List<Book> getAllStartedBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllStartedBooks(loginUserId, pageRequest);
    }

    public List<Book> getAllNotDoneBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllNotDoneBooks(loginUserId, pageRequest);
    }

    public List<Book> getAllDoneBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllDoneBooks(loginUserId, pageRequest);
    }

    public List<Book> getAllGiveUpBook(Long loginUserId, Pageable pageRequest) {
        return bookRepository.findAllGiveUpBooks(loginUserId, pageRequest);
    }

    public Book getCurrentReadingSessionBook(Long loginUserId) {
        ReadingSession currentReadingSession = readingSessionRepository.getCurrentReadingSessionEager(loginUserId)
                .orElseThrow(() -> new NotFoundException(""));

        return currentReadingSession.getBook();
    }

    public void addBook(Book book) {
        bookRepository.save(book);
    }

    @Transactional
    public void editBook(Book editedBook) {
        Book bookToEdit = bookRepository.findById(editedBook.getBookId())
                .orElseThrow(() -> new NotFoundException("수정하실려는 책이 없어요"));

        if (editedBook.getTitle() != null) {
            bookToEdit.setTitle(editedBook.getTitle());
        }
        bookToEdit.setLanguage(editedBook.getLanguage());
        if (editedBook.getCover() != null) {
            bookToEdit.setCover(editedBook.getCover());
        }
        if (editedBook.getSummary() != null) {
            bookToEdit.setCover(editedBook.getCover());
        }
        if (editedBook.getSource() != null) {
            bookToEdit.setSource(editedBook.getSource());
        }
        if (editedBook.getReview() != null) {
            bookToEdit.setReview(editedBook.getReview());
        }
        if (editedBook.getIsSharing() != null) {
            bookToEdit.setIsSharing(editedBook.getIsSharing());
        }
        if (editedBook.getCurrentPage() != null) {
            bookToEdit.setCurrentPage(editedBook.getCurrentPage());
        }
    }

    public void deleteBookByBookId(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new NotFoundException("삭제하시려는 책이 없어요. 다시 확인해 주새요"));

        Long loginUserId = AppUserService.getLoginAppUserId();
        if (!book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException("해당 책을 삭제하실 권한이 없어요");
        }

        bookRepository.deleteById(book.getBookId());
    }
}