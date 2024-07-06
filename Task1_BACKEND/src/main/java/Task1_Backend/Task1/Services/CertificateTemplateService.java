package Task1_Backend.Task1.Services;

import Task1_Backend.Task1.Dto.CertificateTemplateDTO;
import Task1_Backend.Task1.Entity.CertificateTemplate;
import Task1_Backend.Task1.Mappers.CertificateTemplateTransformer;
import Task1_Backend.Task1.Repository.CertificateTemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
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

	public CertificateTemplateDTO getTemplateById(Long id){
		CertificateTemplate certificateTemplate = certificateTemplateRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Template not found"));
		return certificateTemplateTransformer.toDTO(certificateTemplate);

	}

	public CertificateTemplateDTO addTemplate(MultipartFile file, String name) throws IOException {

		System.out.println("Received file: " + file.getOriginalFilename());
		System.out.println("Received name: " + name);

		Path directory = Paths.get(System.getProperty("user.home"), "certificate-templates");
		if (!Files.exists(directory)) {
			Files.createDirectories(directory);
		}

		String fileName = UUID.randomUUID().toString() + getFileExtension(file.getOriginalFilename());

		Path filePath = directory.resolve(fileName);
		Files.copy(file.getInputStream(), filePath);

		CertificateTemplate certificateTemplate = CertificateTemplate.builder()
				.name(name)
				.templatePath(filePath.toString())
				.build();

		certificateTemplateRepository.save(certificateTemplate);

		System.out.println("Saved template path: " + certificateTemplate.getTemplatePath());


		return certificateTemplateTransformer.toDTO(certificateTemplate);
	}

	private String getFileExtension(String fileName) {
		int dotIndex = fileName.lastIndexOf('.');
		return (dotIndex == -1) ? "" : fileName.substring(dotIndex);
	}

	public void deleteTemplate(Long id) {
		if (!certificateTemplateRepository.existsById(id)) {
			throw new IllegalArgumentException("Template not found");
		}
		certificateTemplateRepository.deleteById(id);
	}

	public CertificateTemplateDTO updateTemplate(Long id, String name, MultipartFile file, String templatePath) throws IOException {
		CertificateTemplate existingTemplate = certificateTemplateRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Template not found"));

		existingTemplate.setName(name);

		if (file != null && !file.isEmpty()) {
			String fileName = UUID.randomUUID().toString() + getFileExtension(file.getOriginalFilename());
			Path filePath = Paths.get(System.getProperty("user.home"), "certificate-templates", fileName);
			Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
			existingTemplate.setTemplatePath(filePath.toString());
		} else if (templatePath != null && !templatePath.isEmpty()) {
			existingTemplate.setTemplatePath(templatePath);
		}

		certificateTemplateRepository.save(existingTemplate);
		return certificateTemplateTransformer.toDTO(existingTemplate);
	}




}
