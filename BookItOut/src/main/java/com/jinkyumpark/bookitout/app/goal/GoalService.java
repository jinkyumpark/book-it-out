package com.jinkyumpark.bookitout.app.goal;

import com.jinkyumpark.bookitout.app.statistics.StatisticsService;
import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class GoalService {
    private final GoalRepository goalRepository;
    private final StatisticsService statisticsService;

    public Goal getGoalByYear(Long loginUserId, Integer year) {
        GoalId goalId = new GoalId(loginUserId, year);
        return goalRepository.findByGoalId(goalId)
                .orElseThrow(() -> new NotFoundException("목표가 설정되지 않았어요. 목표를 설정해 주세요"));
    }

    public Optional<Goal> getGoalByYearOptional(Long loginUserId, Integer year) {
        GoalId goalId = new GoalId(loginUserId, year);
        return goalRepository.findByGoalId(goalId);
    }

    public List<Goal> getGoalByStartYearAndEndYear(Long loginUserId, Integer startYear, Integer endYear) {
        return goalRepository.findAllByAppUser_AppUserIdAndGoalId_YearBetween(loginUserId, startYear, endYear);
    }

    public void addGoal(Long appUserId, Goal newGoal) {
        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(appUserId, newGoal.getGoalId().getYear());
        Integer totalBookReadDuringYear = monthStatisticsList.stream().mapToInt(MonthStatistics::getFinishedBook).sum();
        newGoal.setCurrent(totalBookReadDuringYear);

        goalRepository.save(newGoal);
    }

    @Transactional
    public void editGoal(Goal editedGoal) {
        Goal goal = goalRepository.findByGoalId(editedGoal.getGoalId())
                .orElseThrow(() -> new NotFoundException("수정하려는 목표가 없어요"));

        goal.setGoal(editedGoal.getGoal());
    }

    public void deleteGoal(Long loginUserId, Integer year) {
        GoalId goalId = new GoalId(loginUserId, year);
        Optional<Goal> goalOptional = goalRepository.findByGoalId(goalId);

        if (goalOptional.isEmpty()) {
            throw new NotFoundException("지우실려는 목표가 없어요");
        }

        goalRepository.deleteByGoalId(goalId);
    }
}
