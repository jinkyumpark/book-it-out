package com.jinkyumpark.bookitout.app.qna;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnaRepository extends PagingAndSortingRepository<Qna, Long> {

    @Query("select q from Qna q where q.appUser.appUserId = ?1")
    List<Qna> findAllByAppUser_AppUserId(Long appUserId);
}
