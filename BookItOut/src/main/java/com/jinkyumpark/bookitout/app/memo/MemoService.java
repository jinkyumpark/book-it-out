package com.jinkyumpark.bookitout.app.memo;

import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@Service
public class MemoService {
    private MemoRepository memoRepository;

    public List<Memo> getAllMemoByBookId(Long bookId) {
        return memoRepository.findAllByBook_BookId(bookId);
    }

    public Memo getMemoByMemoId(Long memoId) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException("메모가 없어요"));

        return memo;
    }

    public void addMemo(Memo memo) {
        memoRepository.save(memo);
    }

    @Transactional
    public void editMemo(Long memoId, Integer page, String content) {
        Memo existingMemo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException("메모가 없어요"));

        if (page != null) {
            existingMemo.setPage(page);
        }

        if (content != null) {
            existingMemo.setContent(content);
        }
    }

    public void deleteMemo(Long memoId) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException("메모가 없어요"));

        memoRepository.deleteById(memoId);
    }
}
