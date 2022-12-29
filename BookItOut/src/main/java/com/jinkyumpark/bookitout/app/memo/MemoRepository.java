package com.jinkyumpark.bookitout.app.memo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoRepository extends JpaRepository<Memo, Long> {
    @Query("select m from Memo m where m.book.bookId = ?1")
    List<Memo> findAllByBook_BookId(Long bookId);
}
