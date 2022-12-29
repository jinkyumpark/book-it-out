package com.jinkyumpark.bookitout.app.book.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Deprecated
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
}
