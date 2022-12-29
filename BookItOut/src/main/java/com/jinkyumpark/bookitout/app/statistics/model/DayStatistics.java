package com.jinkyumpark.bookitout.app.statistics.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DayStatistics {
    private Integer averageReadTime;
    private Integer mostReadTime;
}