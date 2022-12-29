package com.jinkyumpark.bookitout.app.memo;

import com.jinkyumpark.bookitout.app.book.BookService;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.app.memo.request.MemoAddRequest;
import com.jinkyumpark.bookitout.app.memo.request.MemoEditRequest;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/memo")
public class MemoControllerV1 {
    private MemoService memoService;
    private BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Memo> getAllMemoByBookId(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(loginUserId) && !book.getIsSharing()) {
            throw new BookNotSharingException("해당 책은 공유를 허용하지 않았어요");
        }

        List<Memo> memoList = memoService.getAllMemoByBookId(bookId);
        return memoList;
    }

    @PostMapping("{bookId}")
    public AddSuccessResponse addMemo(@PathVariable("bookId") Long bookId,
                                      @RequestBody @Valid MemoAddRequest memoAddRequest
    ) {
        Book book = bookService.getBookById(bookId);
        Memo memo = new Memo(memoAddRequest.getPage(), memoAddRequest.getContent(), book);

        memoService.addMemo(memo);

        return new AddSuccessResponse("메모를 추가했어요");
    }

    @PutMapping("{memoId}")
    public EditSuccessResponse editMemo(@PathVariable("memoId") Long memoId,
                                        @RequestBody @Valid MemoEditRequest memoEditRequest
    ) {
        memoService.editMemo(memoId, memoEditRequest.getPage(), memoEditRequest.getContent());

        return new EditSuccessResponse(String.format("PUT /v1/memo/%d", memoId), "메모를 수정했어요");
    }

    @DeleteMapping("{memoId}")
    public DeleteSuccessResponse deleteMemo(@PathVariable("memoId") Long memoId) {
        memoService.deleteMemo(memoId);

        return new DeleteSuccessResponse(String.format("DELETE /v1/memo/%d", memoId), "메모를 지웠어요");
    }
}
