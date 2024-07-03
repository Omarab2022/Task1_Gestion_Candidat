package Task1_Backend.Task1.Mappers;

import Task1_Backend.Task1.Dto.CertificateTemplateDTO;
import Task1_Backend.Task1.Entity.CertificateTemplate;
import org.springframework.stereotype.Component;

@Component
public class CertificateTemplateTransformer {
	public CertificateTemplateDTO toDTO(CertificateTemplate template) {
		return CertificateTemplateDTO.builder()
				.id(template.getId())
				.name(template.getName())
				.templatePath(template.getTemplatePath())
				.build();
	}

	public CertificateTemplate toEntity(CertificateTemplateDTO dto) {
		return CertificateTemplate.builder()
				.id(dto.getId())
				.name(dto.getName())
				.templatePath(dto.getTemplatePath())
				.build();
	}
}