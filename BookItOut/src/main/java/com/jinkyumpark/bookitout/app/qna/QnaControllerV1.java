package com.jinkyumpark.bookitout.app.qna;

import com.jinkyumpark.bookitout.app.qna.request.QnaAddRequest;
import com.jinkyumpark.bookitout.app.qna.request.QnaEditRequest;
import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/qna")
public class QnaControllerV1 {
    private final QnaService qnaService;

    @GetMapping("all")
    public Page<Qna> getAllQna(
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size
    ) {
        if (page == null) page = 0;
        if (size == null) size = 10;

        PageRequest pageRequest = PageRequest.of(page, size);
        return qnaService.getAllQnaPage(pageRequest);
    }

    @GetMapping("all/user")
    public List<Qna> getAllQnaByUserId() {
        Long loginUserId = AppUserService.getLoginAppUserId();

        return qnaService.getAllQnaByUserid(loginUserId);
    }

    @PostMapping
    public AddSuccessResponse addQna(@RequestBody @Valid QnaAddRequest qnaAddRequest) {
        Qna qna = new Qna(qnaAddRequest.getQuestion());
        if (qnaAddRequest.getAppUserId() == null) {
            if (qnaAddRequest.getPassword() == null) {
                throw new BadRequestException("로그인하거나 QNA에 비밀번호를 설정해 주세요");
            }

            qna.setPassword(qnaAddRequest.getPassword());
        } else {
            qna.setAppUser(new AppUser(qnaAddRequest.getAppUserId()));
        }


        qnaService.addQna(qna);

        return new AddSuccessResponse("POST v1/qna", "QNA를 추가했어요");
    }

    @PutMapping("{qnaId}")
    public EditSuccessResponse editQna(
            @PathVariable("qnaId") Long qnaId,
            @RequestBody @Valid QnaEditRequest qnaEditRequest
    ) {
        Qna qna = qnaService.getQnaById(qnaId);

        if (qna.getAppUser() != null) {
            Long appUserId = AppUserService.getLoginAppUserId();
            if (!qna.getAppUser().getAppUserId().equals(appUserId)) {
                throw new NotAuthorizeException();
            }
        } else if (! qna.getPassword().equals(qnaEditRequest.getPassword())) {
            throw new NotAuthorizeException();
        }

        qna.setQuestion(qna.getQuestion());
        qnaService.editQna(qna);

        return new EditSuccessResponse(String.format("PUT v1/qna/%d", qnaId), "QNA를 수정했어요");
    }

    @DeleteMapping("{qnaId}")
    public DeleteSuccessResponse deleteQna(@PathVariable("qnaId") Long qnaId, @RequestParam(value = "password", required = false) String password) {
        Qna qna = qnaService.getQnaById(qnaId);

        if (qna.getAppUser() != null) {
            Long loginAppUser = AppUserService.getLoginAppUserId();
            if (!qna.getAppUser().getAppUserId().equals(loginAppUser)) {
                throw new NotAuthorizeException("QNA는 남긴 사람만 지울 수 있어요");
            }
        }

        if (qna.getAppUser() == null) {
            if (!qna.getPassword().equals(password)) {
                throw new NotAuthorizeException("비밀번호가 일치하지 않아요");
            }
        }

        qnaService.deleteQnaById(qnaId);
        return new DeleteSuccessResponse(String.format("DELETE v1/qna/%d", qnaId), "QNA를 지웠어요");
    }
}
