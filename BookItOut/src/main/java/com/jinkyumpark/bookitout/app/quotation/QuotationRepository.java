package com.jinkyumpark.bookitout.app.quotation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {
    @Query("select q from Quotation q where q.book.bookId = ?1")
    List<Quotation> findAllByBook_BookId(Long bookId);
}
