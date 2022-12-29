package com.jinkyumpark.bookitout.app.statistics.response;

import com.jinkyumpark.bookitout.app.statistics.model.DayStatistics;
import com.jinkyumpark.bookitout.app.statistics.model.YearStatistics;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SummaryStatistics {
    private Integer status;

    private Integer year;

    private YearStatistics yearStatistics;
    private DayStatistics dayStatistics;

    private Integer goal;
}