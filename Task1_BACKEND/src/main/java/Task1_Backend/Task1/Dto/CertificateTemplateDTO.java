package Task1_Backend.Task1.Dto;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class CertificateTemplateDTO {
	private Long id;
	private String name;
	private String templatePath;
}