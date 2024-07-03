package Task1_Backend.Task1.Mapper;


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

	public Candidat toEntity(CandidateDTO candidateDTO) {
		return Candidat.builder()
				.id(candidateDTO.getId())
				.name(candidateDTO.getName())
				.score(candidateDTO.getScore())
				.dateNaissance(candidateDTO.getDateNaissance())
				.build();
	}
}
