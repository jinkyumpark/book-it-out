package com.jinkyumpark.bookitout.app.goal;

import com.jinkyumpark.bookitout.app.goal.response.GoalResponse;
import com.jinkyumpark.bookitout.app.statistics.StatisticsService;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController @RequestMapping("/v1/goal")
public class GoalControllerV1 {
    private final GoalService goalService;
    private final StatisticsService statisticsService;

    @GetMapping("{year}")
    public GoalResponse getGoalByYear(@PathVariable(value = "year", required = false) Integer year) {
        if (year == null) year = LocalDateTime.now().getYear();

        Long loginUserId = AppUserService.getLoginAppUserId();

        Goal goal = goalService.getGoalByYear(loginUserId, year);

        return new GoalResponse(goal.getGoalId().getYear(), goal.getGoal(), goal.getCurrent());
    }

    @GetMapping
    public List<GoalResponse> getGoalByDuration(@RequestParam(value = "duration", required = false) Integer duration) {
        if (duration == null) duration = 5;

        Long loginUserId = AppUserService.getLoginAppUserId();
        Integer endYear = LocalDateTime.now().getYear();
        Integer startYear = endYear - duration;

        return goalService
                .getGoalByStartYearAndEndYear(loginUserId, startYear, endYear)
                .stream()
                .map(goal -> new GoalResponse(goal.getGoalId().getYear(), goal.getGoal(), goal.getCurrent()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public AddSuccessResponse addGoal(
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "goal") Integer goal
    ) {
        if (year == null) year = LocalDateTime.now().getYear();

        Long loginUserId = AppUserService.getLoginAppUserId();
        GoalId goalId = new GoalId(loginUserId, year);
        Goal newGoal = new Goal(goalId, goal, loginUserId);

        goalService.addGoal(loginUserId, newGoal);

        return new AddSuccessResponse(String.format("POST v1/goal/%d/%d", year, goal), "목표를 설정했어요");
    }

    @PutMapping("{year}")
    public EditSuccessResponse editGoal(
            @PathVariable("year") Integer year,
            @RequestParam("goal") Integer goal
    ) {
        Long loginUserId = AppUserService.getLoginAppUserId();

        GoalId goalId = new GoalId(loginUserId, year);
        Goal editedGoal = new Goal(goalId, goal, loginUserId);

        goalService.editGoal(editedGoal);

        return new EditSuccessResponse(String.format("PUT v1/goal/%d?goal=%d", year, goal), String.format("%d년의 목표를 %d로 수정했어요", year, goal));
    }

    @DeleteMapping("{year}")
    public DeleteSuccessResponse deleteGoal(@PathVariable("year") Integer year) {
        Long loginUserId = AppUserService.getLoginAppUserId();

        goalService.deleteGoal(loginUserId, year);

        return new DeleteSuccessResponse(String.format("DELETE v1/goal/%d", year), "목표를 지웠어요");
    }
}
