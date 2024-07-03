package Task1_Backend.Task1.Controllers;


import Task1_Backend.Task1.Dto.CandidateDTO;
import Task1_Backend.Task1.Entity.Candidat;
import Task1_Backend.Task1.Services.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate")
public class CandidateController {


	@Autowired
	private CandidateService candidateService;

	public CandidateController(CandidateService candidateService) {
		this.candidateService = candidateService;
	}

	@GetMapping("/all")
	public List<CandidateDTO> GetAllCandidates(){
		return candidateService.getAllCandidates();
	}

	@GetMapping("/{id}")
	public CandidateDTO GetCandidateById(@PathVariable Long id){
		return candidateService.getCandidatById(id);
	}

	@DeleteMapping("/delete/{id}")
	public void DeleteCandidate(Long id){
		candidateService.deleteCandidat(id);
	}

	@PutMapping("/update/{id}")
	public CandidateDTO UpdateCandidate(@PathVariable Long id, @RequestBody CandidateDTO candidateDTO) {
		return candidateService.updateCandidat(id, candidateDTO);
	}

	@GetMapping("/numberofcandidates")
	public Long GetNumberOfCandidates(){
		return candidateService.getNumberOfCandidates();
	}
}
