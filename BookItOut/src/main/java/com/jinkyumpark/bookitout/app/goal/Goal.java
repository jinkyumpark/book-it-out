package com.jinkyumpark.bookitout.app.goal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @EqualsAndHashCode

@Entity(name = "Goal") @Table(name = "goal")
@DynamicInsert
public class Goal {
    @EmbeddedId
    private GoalId goalId;

    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "goal_app_user_fk"))
    @JsonIgnore
    private AppUser appUser;

    private Integer goal;

    @ColumnDefault("0")
    private Integer current;

    public Goal(GoalId goalId, Integer goal, Long appUserId) {
        this.goalId = goalId;
        this.goal = goal;
        this.appUser = new AppUser(appUserId);
    }
}