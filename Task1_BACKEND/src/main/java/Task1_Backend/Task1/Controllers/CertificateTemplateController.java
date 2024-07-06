package Task1_Backend.Task1.Controllers;

import Task1_Backend.Task1.Dto.CertificateTemplateDTO;
import Task1_Backend.Task1.Entity.CertificateTemplate;
import Task1_Backend.Task1.Mappers.CertificateTemplateTransformer;
import Task1_Backend.Task1.Repository.CertificateTemplateRepository;
import Task1_Backend.Task1.Services.CertificateTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/certificateTemplate")
public class CertificateTemplateController {


	@Autowired
	private CertificateTemplateService certificateTemplateService;


	public CertificateTemplateController(CertificateTemplateService certificateTemplateService
	                                   ) {
		this.certificateTemplateService = certificateTemplateService;

	}

	@GetMapping("/all")
	public List<CertificateTemplateDTO> getAllTemplates() {
		return certificateTemplateService.getAllTemplates();
	}

	@GetMapping("{id}")
	public CertificateTemplateDTO getTemplateById(@PathVariable Long id) {
		return certificateTemplateService.getTemplateById(id);
	}

	@GetMapping("/numberoftemplates")
	public Long getNumberOfTemplates() {
		return certificateTemplateService.getNumberOfTemplates();
	}


	@DeleteMapping("/delete/{id}")
	public void DeleteTemplate(@PathVariable Long  id){
		certificateTemplateService.deleteTemplate(id);
	}

	@PutMapping("/update/{id}")
	public CertificateTemplateDTO updateTemplate(@PathVariable Long id,
	                                             @RequestParam("name") String name,
	                                             @RequestParam(value = "file", required = false) MultipartFile file,
	                                             @RequestParam(value = "templatePath", required = false) String templatePath) throws IOException {
		return certificateTemplateService.updateTemplate(id, name, file, templatePath);
	}



	@PostMapping("/add")
	public CertificateTemplateDTO AddTemplate(@RequestParam("file") MultipartFile file,
	                                          @RequestParam("name") String name) throws IOException {
		return certificateTemplateService.addTemplate(file, name);
	}
}
