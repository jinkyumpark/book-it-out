package com.jinkyumpark.bookitout.app.statistics.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter

@DynamicInsert
@Entity(name = "month_statistics") @Table(name = "MonthStatistics")
public class MonthStatistics {
    @EmbeddedId
    private MonthStatisticsId monthStatisticsId;

    @JsonIgnore
    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "month_statistics_app_user_fk"))
    private AppUser appUser;

    @Column(name = "total_read_minute")
    private Integer totalReadMinute;

    @Column(name = "finished_book")
    private Integer finishedBook;

    @Column(name = "total_star")
    private Integer totalStar;

    @Column(name = "max_read_minute")
    private Integer maxReadMinute;

    @Column(name = "total_page")
    private Integer totalPage;

    public MonthStatistics(Integer year, Integer month, AppUser appUser) {
        monthStatisticsId = new MonthStatisticsId(appUser.getAppUserId(), year, month);
        this.totalReadMinute = 0;
        this.finishedBook = 0;
        this.totalStar = 0;
        this.maxReadMinute = 0;
        this.totalPage = 0;
        this.appUser = appUser;
    }
}