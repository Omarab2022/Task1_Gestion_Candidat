package Task1_Backend.Task1.Services;

import Task1_Backend.Task1.Dto.CandidateDTO;
import Task1_Backend.Task1.Entity.Candidat;
import Task1_Backend.Task1.Mappers.CandidateTransformer;
import Task1_Backend.Task1.Repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CandidateService {


	@Autowired
	private CandidateRepository candidateRepository;

	@Autowired
	private CandidateTransformer candidateTransformer;

	public CandidateService(CandidateRepository candidateRepository,
	                        CandidateTransformer candidateTransformer) {
		this.candidateRepository = candidateRepository;
		this.candidateTransformer = candidateTransformer;
	}

	public List<CandidateDTO> getAllCandidates(){
		return candidateRepository.findAll().stream()
				.map(candidateTransformer::toDTO)
				.collect(Collectors.toList());
	}

	public CandidateDTO getCandidatById(Long id){
		return candidateTransformer.toDTO(candidateRepository.findById(id).get());
	}

	public void deleteCandidat(Long id){

		if (!candidateRepository.existsById(id)){
			throw new IllegalArgumentException("Candidat not found");
		}
		candidateRepository.deleteById(id);
	}

	public CandidateDTO addCandidat(CandidateDTO candidateDTO){
		Candidat candidat = candidateTransformer.toEntity(candidateDTO);
		candidateRepository.save(candidat);

		return candidateTransformer.toDTO(candidat);
	}

	public CandidateDTO updateCandidat(Long id ,CandidateDTO candidateDTO){

		if (!candidateRepository.existsById(id)){
			throw new IllegalArgumentException("Candidat not found");
		}

        Candidat candidat = candidateTransformer.toEntity(candidateDTO);
		candidat.setId(id);
		candidateRepository.save(candidat);

		return candidateTransformer.toDTO(candidat);
	}


	public Long getNumberOfCandidates(){
		return candidateRepository.count();
	}

}
