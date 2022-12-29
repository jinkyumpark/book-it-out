package com.jinkyumpark.bookitout.app.goal;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface GoalRepository extends PagingAndSortingRepository<Goal, Long> {

    @Query("select g from Goal g where g.goalId = ?1")
    Optional<Goal> findByGoalId(GoalId goalId);

    @Query("select g from Goal g where g.appUser.appUserId = ?1 and g.goalId.year between ?2 and ?3")
    List<Goal> findAllByAppUser_AppUserIdAndGoalId_YearBetween(Long appUserId, Integer startYear, Integer endYear);

    @Transactional
    @Modifying
    @Query("delete from Goal g where g.goalId = ?1")
    void deleteByGoalId(GoalId goalId);
}
