package com.jinkyumpark.bookitout.app.statistics.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @EqualsAndHashCode
@Embeddable
public class MonthStatisticsId implements Serializable {
    @JsonIgnore
    @Column(name = "app_user_id", nullable = false)
    private Long appUserId;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "month", nullable = false)
    private Integer month;
}