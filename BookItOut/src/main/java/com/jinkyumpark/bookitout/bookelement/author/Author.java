package com.jinkyumpark.bookitout.bookelement.author;

import com.jinkyumpark.bookitout.bookelement.author.nationality.Nationality;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "author")
public class Author {
    @Id
    @SequenceGenerator(name = "author_seq", sequenceName = "author_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_seq")
    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "birth_date")
    private LocalDateTime birthDate;

    @Column(name = "dead_date")
    private LocalDateTime deadDate;

    // Fk
    @ManyToOne
    @JoinColumn(name = "nationality_id", nullable = false, foreignKey = @ForeignKey(name = "author_nationality_fk"))
    private Nationality nationality;
}