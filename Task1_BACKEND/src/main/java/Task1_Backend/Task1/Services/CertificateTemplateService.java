package Task1_Backend.Task1.Services;

import Task1_Backend.Task1.Dto.CertificateTemplateDTO;
import Task1_Backend.Task1.Entity.CertificateTemplate;
import Task1_Backend.Task1.Mappers.CertificateTemplateTransformer;
import Task1_Backend.Task1.Repository.CertificateTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CertificateTemplateService {

	@Autowired
	private CertificateTemplateRepository certificateTemplateRepository;

	@Autowired
	private CertificateTemplateTransformer certificateTemplateTransformer;

	public List<CertificateTemplateDTO> getAllTemplates() {
		return certificateTemplateRepository.findAll().stream()
				.map(certificateTemplateTransformer::toDTO)
				.collect(Collectors.toList());
	}

	public Long getNumberOfTemplates() {
		return certificateTemplateRepository.count();
	}

//	public CertificateTemplateDTO getTemplateById(Long id) {
//		return certificateTemplateRepository.findById(id)
//				.map(certificateTemplateTransformer::toDTO)
//				.orElseThrow(() -> new RuntimeException("Template not found"));
//	}



}
