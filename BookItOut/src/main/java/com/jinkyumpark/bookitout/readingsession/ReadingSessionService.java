package com.jinkyumpark.bookitout.readingsession;

import com.jinkyumpark.bookitout.user.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ReadingSessionService {
    private ReadingSessionRepository readingSessionRepository;

    public List<Integer> getReadTimeByDateRange(
            AppUser user,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        List<ReadingSession> readingSessionList = readingSessionRepository.findAllByAppUserAndStartTimeBetween(user, startDate, endDate);

        List<Integer> readingTimeList = new ArrayList<>();
        for (int i = startDate.getDayOfYear(); i <= endDate.getDayOfYear(); i++) {
            int finalI = i;
            Integer totalReadTime = Math.toIntExact(readingSessionList.stream()
                    .filter(r -> r.getStartTime().getDayOfYear() == finalI)
                    .mapToLong(r -> Duration.between(r.getStartTime(), r.getEndTime()).toMinutes())
                    .sum());

            readingTimeList.add(totalReadTime);
        }

        return readingTimeList;
    }

    public List<ReadingSession> getReadingSessionByBookId(Long bookId) {
        return readingSessionRepository.findAllByBook_BookId(bookId);
    }

    public Optional<ReadingSession> getPreviousReadingSession(Long bookId) {
        return readingSessionRepository.findFirstByBook_BookIdOrderByStartTimeDesc(bookId);
    }

    public void addReadingSession(ReadingSession newReadingSession) {
        readingSessionRepository.save(newReadingSession);
    }

    public void deleteReadingSession(Long readingSessionId) {
        readingSessionRepository.deleteById(readingSessionId);
    }

    public Optional<ReadingSession> getReadingSessionByReadingSessionId(Long readingSessionId) {
        return readingSessionRepository.findById(readingSessionId);
    }

    @Transactional
    public void updateReadingSession(ReadingSession updatedReadingSession) {
        Optional<ReadingSession> readingSessionOptional = readingSessionRepository.findById(updatedReadingSession.getReadingSessionId());

        if (readingSessionOptional.isPresent()) {
            readingSessionOptional.get().setEndTime(updatedReadingSession.getEndTime());
            readingSessionOptional.get().setEndPage(updatedReadingSession.getEndPage());
        }
    }

    public List<ReadingSession> getRecentReadingSessions(Long appUserId, Pageable pageRequest) {
        return readingSessionRepository.findAllRecentReadingSession(appUserId, pageRequest);
    }
}