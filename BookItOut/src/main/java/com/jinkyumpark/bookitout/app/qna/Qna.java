package com.jinkyumpark.bookitout.app.qna;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter @Setter
@Entity(name = "Qna")
@Table(name = "qna")
public class Qna {
    @SequenceGenerator(name = "qna_seq", sequenceName = "qna_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "qna_seq")
    @Column(name = "qna_id", updatable = false)
    @Id
    private Long qnaId;

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", foreignKey = @ForeignKey(name = "qna_app_user_fk"))
    @JsonIgnore
    private AppUser appUser;

    public Qna(String question) {
        this.question = question;
    }
}
