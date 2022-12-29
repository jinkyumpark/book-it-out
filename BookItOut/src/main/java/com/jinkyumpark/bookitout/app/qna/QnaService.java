package com.jinkyumpark.bookitout.app.qna;

import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class QnaService {
    private final QnaRepository qnaRepository;

    public Page<Qna> getAllQnaPage(PageRequest pageRequest) {
        return qnaRepository.findAll(pageRequest);
    }

    public List<Qna> getAllQnaByUserid(Long userId) {
        return qnaRepository.findAllByAppUser_AppUserId(userId);
    }

    public void addQna(Qna qna) {
        qnaRepository.save(qna);
    }

    public Qna getQnaById(Long qnaId) {
        return qnaRepository.findById(qnaId)
                .orElseThrow();
    }

    @Transactional
    public void editQna(Qna editedQna) {
        Qna qna = qnaRepository.findById(editedQna.getQnaId())
                .orElseThrow(() -> new NotFoundException("QNA to edit not found"));

        if (editedQna.getPassword() != null) {
            qna.setPassword(editedQna.getPassword());
        }

        if (editedQna.getQuestion() != null) {
            qna.setQuestion(editedQna.getQuestion());
        }

        if (editedQna.getAnswer() != null) {
            qna.setAnswer(editedQna.getAnswer());
        }
    }


    public void deleteQnaById(Long qnaId) {
        qnaRepository.deleteById(qnaId);
    }
}
