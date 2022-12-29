package com.jinkyumpark.bookitout.app.statistics;

import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.app.statistics.model.MonthStatisticsId;
import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StatisticsService {
    private final StatisticsRepository statisticsRepository;

    public MonthStatistics getStatisticsByMonth(Long appUserId, Integer year, Integer month) {
        MonthStatisticsId monthStatisticsId = new MonthStatisticsId(appUserId, year, month);
        Optional<MonthStatistics> monthStatisticsOptional = statisticsRepository.findByMonthStatisticsId(monthStatisticsId);

        if (monthStatisticsOptional.isEmpty()) {
            addStatistics(appUserId, year, month);
            return new MonthStatistics(year, month, new AppUser(appUserId));
        }

        return monthStatisticsOptional.get();
    }

    public List<MonthStatistics> getStatisticsByYear(Long appUserId, Integer year) {
        return statisticsRepository.findAllStatisticsOfYear(appUserId, year);
    }

    public void addStatistics(Long appUserId, Integer year, Integer month) {
        MonthStatistics monthStatistics = new MonthStatistics(year, month, new AppUser(appUserId));
        statisticsRepository.save(monthStatistics);
    }

    @Transactional
    public void updateStatistics(MonthStatistics updatedStatistics) {
        MonthStatisticsId monthStatisticsId = new MonthStatisticsId(
                updatedStatistics.getMonthStatisticsId().getAppUserId(),
                updatedStatistics.getMonthStatisticsId().getYear(),
                updatedStatistics.getMonthStatisticsId().getMonth()
        );
        Optional<MonthStatistics> monthStatisticsOptional = statisticsRepository
                .findByMonthStatisticsId(monthStatisticsId);

        if (monthStatisticsOptional.isEmpty()) {
            addStatistics(updatedStatistics.getAppUser().getAppUserId(), updatedStatistics.getMonthStatisticsId().getYear(), updatedStatistics.getMonthStatisticsId().getMonth());
        }

        MonthStatistics monthStatistics = statisticsRepository
                .findByMonthStatisticsId(monthStatisticsId)
                .orElseThrow(RuntimeException::new);

        monthStatistics.setTotalReadMinute(updatedStatistics.getTotalReadMinute());
        monthStatistics.setFinishedBook(updatedStatistics.getFinishedBook());
        monthStatistics.setTotalStar(updatedStatistics.getTotalStar());
        monthStatistics.setMaxReadMinute(updatedStatistics.getMaxReadMinute());
        monthStatistics.setTotalPage(updatedStatistics.getTotalPage());
    }
}
