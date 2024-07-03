package Task1_Backend.Task1.Mappers;

import Task1_Backend.Task1.Dto.CandidateDTO;
import Task1_Backend.Task1.Entity.Candidat;
import org.springframework.stereotype.Component;

@Component
public class CandidateTransformer {

	public CandidateDTO toDTO(Candidat candidate) {
		return CandidateDTO.builder()
				.id(candidate.getId())
				.name(candidate.getName())
				.score(candidate.getScore())
				.dateNaissance(candidate.getDateNaissance())
				.build();
	}

	public Candidat toEntity(CandidateDTO dto) {
		return Candidat.builder()
				.id(dto.getId())
				.name(dto.getName())
				.score(dto.getScore())
				.dateNaissance(dto.getDateNaissance())
				.build();
	}
}
