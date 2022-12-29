package com.jinkyumpark.bookitout.app.readingsession;

import com.jinkyumpark.bookitout.app.book.BookRepository;
import com.jinkyumpark.bookitout.app.book.BookService;
import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.goal.Goal;
import com.jinkyumpark.bookitout.app.goal.GoalService;
import com.jinkyumpark.bookitout.app.statistics.StatisticsService;
import com.jinkyumpark.bookitout.app.statistics.model.MonthStatistics;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import com.jinkyumpark.bookitout.exception.common.BadRequestException;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.custom.ReadingSessionIsInProgressException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ReadingSessionService {
    private ReadingSessionRepository readingSessionRepository;
    private BookService bookService;
    private StatisticsService statisticsService;
    private GoalService goalService;

    public List<Integer> getReadTimeByDateRange(
            Long appUserId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        List<ReadingSession> readingSessionList = readingSessionRepository.findAllByAppUser_AppUserIdAndStartTimeBetween(appUserId, startDate, endDate);

        List<Integer> readingTimeList = new ArrayList<>();
        for (int i = startDate.getDayOfYear(); i <= endDate.getDayOfYear(); i++) {
            int finalI = i;
            Integer totalReadTime = Math.toIntExact(readingSessionList.stream()
                    .filter(r -> r.getStartTime().getDayOfYear() == finalI)
                    .mapToLong(r -> r.getReadTime() == null ? 0 : r.getReadTime())
                    .sum());

            readingTimeList.add(totalReadTime);
        }

        return readingTimeList;
    }

    public List<ReadingSession> getReadingSessionByBookId(Long bookId) {
        return readingSessionRepository.findAllByBook_BookId(bookId);
    }

    public ReadingSession getCurrentReadingSession(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId)
                .orElseThrow(() -> new NotFoundException("진행중인 독서활동이 없어요"));
    }

    public Optional<ReadingSession> getCurrentReadingSessionOptional(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId);
    }

    public Optional<ReadingSession> getReadingSessionOptionalByReadingSessionId(Long readingSessionId) {
        return readingSessionRepository.findById(readingSessionId);
    }

    public List<ReadingSession> getRecentReadingSessions(Long appUserId, Pageable pageRequest) {
        return readingSessionRepository.findAllRecentReadingSession(appUserId, pageRequest);
    }

    // INSERT, UPDATE, DELETE

    @Transactional
    public void addReadingSession(ReadingSession newReadingSession) {
        Book book = bookService.getBookById(newReadingSession.getBook().getBookId());
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(loginUserId))
            throw new NotAuthorizeException("독서활동을 추가하시려는 책의 주인이 아니에요");
        if (!newReadingSession.getStartPage().equals(book.getCurrentPage() + 1) && book.getCurrentPage() != 0)
            throw new BadRequestException("독서활동 시작 페이지는 바로 전 독서활동 페이지 바로 뒤여야만 해요");
        Optional<ReadingSession> currentReadingSessionOptional = this.getCurrentReadingSessionOptional(loginUserId);
        if (currentReadingSessionOptional.isPresent())
            throw new ReadingSessionIsInProgressException(currentReadingSessionOptional.get().getBook().getBookId());
        if (newReadingSession.getEndPage() != null && newReadingSession.getEndPage() > book.getEndPage())
            throw new BadRequestException("독서활동 페이지는 책 마지막 페이지보다 클 수 없어요");
        if (newReadingSession.getEndPage() != null && newReadingSession.getEndPage() < 0 || newReadingSession.getStartPage() < 0)
            throw new BadRequestException("독서활동 페이지는 반드시 0보다 커야 해요");

        readingSessionRepository.save(newReadingSession);

        if (newReadingSession.getReadTime() == null && newReadingSession.getEndPage() == null) return;

        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(
                loginUserId,
                newReadingSession.getStartTime().getYear(),
                newReadingSession.getStartTime().getMonthValue()
        );
        if (newReadingSession.getEndPage() != null) book.setCurrentPage(newReadingSession.getEndPage());
        if (newReadingSession.getReadTime() != null)
            monthStatistics.setTotalReadMinute(monthStatistics.getTotalReadMinute() + newReadingSession.getReadTime());
        if (newReadingSession.getReadTime() != null && monthStatistics.getMaxReadMinute() < newReadingSession.getReadTime())
            monthStatistics.setMaxReadMinute(newReadingSession.getReadTime());
        if (newReadingSession.getEndPage() != null)
            monthStatistics.setTotalPage(monthStatistics.getTotalPage() + (newReadingSession.getEndPage() - newReadingSession.getStartPage() + 1));
        if (newReadingSession.getEndPage().equals(book.getEndPage())) {
            Goal goal = goalService.getGoalByYear(loginUserId, newReadingSession.getStartTime().getYear());
            goal.setCurrent(goal.getCurrent() + 1);
            monthStatistics.setFinishedBook(monthStatistics.getFinishedBook() + 1);
        }
    }

    @Transactional
    public void deleteReadingSession(Long readingSessionId, Long loginUserId) {
        ReadingSession readingSession = this.getReadingSessionOptionalByReadingSessionId(readingSessionId)
                .orElseThrow(() -> new NotFoundException("지우실려는 독서활동이 없어요"));
        Long readingSessionAppUserId = readingSession.getBook().getAppUser().getAppUserId();

        if (!loginUserId.equals(readingSessionAppUserId))
            throw new NotAuthorizeException("독서활동을 지우실 권한이 없어요");
        if (readingSession.getEndPage() != null && !readingSession.getEndPage().equals(readingSession.getBook().getCurrentPage()))
            throw new BadRequestException("가장 최근의 독서활동만 지우실 수 있어요");

        readingSessionRepository.deleteById(readingSessionId);
        if (readingSession.getReadTime() == null && readingSession.getReadTime() == null) return;

        Book book = readingSession.getBook();
        MonthStatistics statistics = statisticsService.getStatisticsByMonth(
                loginUserId,
                readingSession.getStartTime().getYear(),
                readingSession.getStartTime().getMonthValue()
        );
        if (readingSession.getEndPage() != null) {
            book.setCurrentPage(readingSession.getStartPage() - 1);
            statistics.setTotalPage(statistics.getTotalPage() - (readingSession.getEndPage() - readingSession.getStartPage()));
        }
        if (readingSession.getReadTime() != null)
            statistics.setTotalReadMinute(statistics.getTotalReadMinute() - readingSession.getReadTime());
        if (readingSession.getEndPage().equals(readingSession.getBook().getEndPage())) {
            Goal goal = goalService.getGoalByYear(loginUserId, readingSession.getStartTime().getYear());
            goal.setCurrent(goal.getCurrent() - 1);
            statistics.setFinishedBook(statistics.getFinishedBook() - 1);
        }
    }

    @Transactional
    public void updateReadingSession(ReadingSession updatedReadingSession, Long loginUserId) {
        ReadingSession previousReadingSession = readingSessionRepository.findById(updatedReadingSession.getReadingSessionId())
                .orElseThrow(() -> new NotFoundException("찾을 수 없어요"));

        if (!previousReadingSession.getAppUser().getAppUserId().equals(loginUserId))
            throw new NotAuthorizeException("해당 독서활동을 수정할 권한이 없어요");
        if (previousReadingSession.getEndPage() != null && previousReadingSession.getBook().getCurrentPage() >= previousReadingSession.getEndPage())
            throw new BadRequestException("그 전 독서활동보다 적은 페이지에요");
        if (previousReadingSession.getEndPage() != null && previousReadingSession.getBook().getEndPage() < previousReadingSession.getEndPage())
            throw new BadRequestException("책의 마지막 페이지보다 커요");
        if (!previousReadingSession.getBook().getCurrentPage().equals(previousReadingSession.getEndPage()) && previousReadingSession.getEndPage() != null)
            throw new BadRequestException("가장 최근의 독서활동만 수정할 수 있어요");

        Book book = bookService.getBookById(previousReadingSession.getBook().getBookId());
        MonthStatistics monthStatistics = statisticsService.getStatisticsByMonth(loginUserId, previousReadingSession.getStartTime().getYear(), previousReadingSession.getStartTime().getMonthValue());
        if (updatedReadingSession.getEndPage() != null) {
            previousReadingSession.setEndPage(updatedReadingSession.getEndPage());
            book.setCurrentPage(previousReadingSession.getEndPage());
        }
        if (previousReadingSession.getEndPage() != null && updatedReadingSession.getEndPage() != null) {
            Integer previousReadingPage = previousReadingSession.getEndPage() - previousReadingSession.getStartPage() + 1;
            Integer currentReadingPage = updatedReadingSession.getEndPage() - updatedReadingSession.getStartPage() + 1;
            monthStatistics.setTotalPage(monthStatistics.getTotalPage() - previousReadingPage + currentReadingPage);
        }
        if (updatedReadingSession.getReadTime() != null) {
            monthStatistics.setTotalReadMinute(
                    monthStatistics.getTotalReadMinute() + updatedReadingSession.getReadTime()
                    - (previousReadingSession.getReadTime() == null ? 0 : previousReadingSession.getReadTime())
            );
        }
        if (updatedReadingSession.getReadTime() != null && monthStatistics.getMaxReadMinute() < updatedReadingSession.getReadTime()) {
            monthStatistics.setMaxReadMinute(updatedReadingSession.getReadTime());
        }
        if (updatedReadingSession.getEndPage() != null &&
                updatedReadingSession.getEndPage().equals(book.getEndPage()) &&
                !previousReadingSession.getEndPage().equals(book.getEndPage())
        ) {
            monthStatistics.setFinishedBook(monthStatistics.getFinishedBook() + 1);
            Integer readingSessionYear = updatedReadingSession.getStartTime() == null ? previousReadingSession.getStartTime().getYear() : updatedReadingSession.getStartTime().getYear();
            Goal goal = goalService.getGoalByYear(loginUserId, readingSessionYear);
            goal.setCurrent(goal.getCurrent() + 1);
        }


        previousReadingSession.setReadTime(updatedReadingSession.getReadTime());
        previousReadingSession.setEndTime(updatedReadingSession.getEndTime());
    }
}
