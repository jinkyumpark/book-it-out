package com.jinkyumpark.bookitout.app.readingsession.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter @Setter
public class AddReadingSessionRequest {
    @NotNull
    private LocalDate startDate;

    @NotNull
    private Integer startPage;

    @NotNull
    private Integer endPage;

    @NotNull
    private Integer readTime;
}