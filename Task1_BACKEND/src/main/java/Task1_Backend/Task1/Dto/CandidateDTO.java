package Task1_Backend.Task1.Dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CandidateDTO {
	private Long id;
	private String name;
	private Double score;
	private LocalDate dateNaissance;
}