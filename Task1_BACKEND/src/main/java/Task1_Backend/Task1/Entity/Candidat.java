package Task1_Backend.Task1.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


public class Candidat {


<<<<<<< Updated upstream
=======
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	private Double score;

	@Column(name = "date_naissance")
	private LocalDate dateNaissance;

>>>>>>> Stashed changes

}
