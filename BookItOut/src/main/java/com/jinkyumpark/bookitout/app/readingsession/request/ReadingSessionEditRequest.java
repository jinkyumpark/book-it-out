package com.jinkyumpark.bookitout.app.readingsession.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ReadingSessionEditRequest {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer readTime;
    private Integer endPage;
}