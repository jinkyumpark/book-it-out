package com.jinkyumpark.bookitout.quotation;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.quotation.request.QuotationAddRequest;
import com.jinkyumpark.bookitout.response.AddSucessResponse;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor

@RestController
@RequestMapping("/v1/quotation")
public class QuotationControllerV1 {
    QuotationService quotationService;
    BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Quotation> getAllQuotationByBookId(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(loginUserId) && !book.getIsSharing()) {
            throw new BookNotSharingException();
        }

        return quotationService.getAllQuotationByBookId(bookId);
    }

    @PostMapping("{bookId}")
    public AddSucessResponse addQuotation(@PathVariable("bookId") Long bookId,
                                          @RequestBody @Valid QuotationAddRequest quotationAddRequest) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (! book.getAppUser().getAppUserId().equals(loginUserId)) {
            throw new NotAuthorizeException();
        }

        Quotation quotation = new Quotation(quotationAddRequest.getPage(), quotationAddRequest.getContent(), quotationAddRequest.getFromWho(), book);
        quotationService.addQuotation(quotation);

        return new AddSucessResponse("인용을 추가했어요");
    }
}
