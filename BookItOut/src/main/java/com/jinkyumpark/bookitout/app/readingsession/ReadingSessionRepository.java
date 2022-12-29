package com.jinkyumpark.bookitout.app.readingsession;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReadingSessionRepository extends JpaRepository<ReadingSession, Long> {

    @Query("select r from ReadingSession r join fetch r.book where r.appUser.appUserId = ?1 and r.book.currentPage < r.book.endPage and r.book.isGiveUp = false order by r.endTime desc")
    List<ReadingSession> findAllBookNotDoneReadingSession(Long appUserId, Pageable pageable);

    List<ReadingSession> findAllByAppUser_AppUserIdAndStartTimeBetween(Long appUserId, LocalDateTime startTime, LocalDateTime endTime);

    List<ReadingSession> findAllByBook_BookId(Long bookId);

    @Query("select r from ReadingSession r where r.appUser.appUserId = ?1 order by r.startTime DESC")
    List<ReadingSession> findAllRecentReadingSession(Long appUserId, Pageable pageable);

    Optional<ReadingSession> findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(Long appUserId);

    @Query("select r from ReadingSession r join fetch r.book where r.appUser.appUserId = ?1 and r.endTime is null order by r.startTime DESC")
    Optional<ReadingSession> getCurrentReadingSessionEager(Long appUserId);
}
