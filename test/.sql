/*
update table and add it the foreing key with an restrict  option.
*/

ALTER TABLE solicitudes
ADD CONSTRAINT fk_solicitudes_alumnos 
FOREIGN KEY (idAlumno) 
REFERENCES alumno(idAlumno) 
ON DELETE CASCADE;

ALTER TABLE escuelas
ADD CONSTRAINT fk_escuelas_alumnos
FOREIGN KEY (idAlumno)
REFERENCES alumno(idAlumno)
ON DELETE CASCADE;


ALTER TABLE solicitudes
ADD CONSTRAINT fk_solicitudes_escuelas
FOREIGN KEY (idEscuela)
REFERENCES escuelas(idEscuela)
ON DELETE CASCADE;


/*
se va agragar un disparador  para que cuando se inserte o actualice una solicitud, 
*/

DELIMITER 
|
    CREATE TRIGGER insertSolicitud AFTER INSERT ON alumno
    FOR EACH ROW
    BEGIN
        INSERT INTO solicitudes (idAlumno,idEscuela)
        VALUES (NEW.idAlumno,NULL);
    END; 
|

/*
se va agregra disparador para cuando se inserte una escuela y se actuliza el id de escuelas en solicitudes, 
*/

DELIMITER
|
    CREATE TRIGGER updateSolicitudidEscuela AFTER INSERT ON escuelas
    FOR EACH ROW
    BEGIN 
        DECLARE idSolicitudAux INT; 

        SELECT idSolicitud INTO idSolicitudAux 
        FROM solicitudes WHERE solicitudes.idAlumno = NEW.idAlumno
        ORDER BY idSolicitud ASC LIMIT 1; 

        UPDATE solicitudes 
        SET idEscuela = NEW.idEscuela 
        WHERE idSolicitud = idSolicitudAux; 
    END;
|

/*
Prueba de insertar un alumno
*/

INSERT INTO `alumno`(`nombre`) VALUES ('Edwin Miguel Lara Espinoza');
INSERT INTO `escuelas`( `idAlumno`, `nombre`) VALUES (1,'universidad de guanajuato');


DELIMITER
|
	CREATE TRIGGER eliminarTodoSolictud2 BEFORE DELETE ON solicitudes
    FOR EACH ROW
    BEGIN
    	DECLARE idEscuelaAux,idPadreAux,idIngresosFamiliaresAux,idServiciosAux,idRequisitosAdicionalesAux INT;
        
        SELECT solicitudes.idEscuela,solicitudes.idPadre,
        solicitudes.idIngresosFamiliares,solicitudes.idServicios, solicitudes.idRequisitosAdicionales 
        INTO idEscuelaAux, idPadreAux, idIngresosFamiliaresAux, idServiciosAux, idRequisitosAdicionalesAux
        FROM solicitudes WHERE solicitudes.idSolicitud = OLD.idSolicitud;
        
        DELETE FROM escuela WHERE idEscuela = idEscuelaAux;
        DELETE FROM padre WHERE idPadre = idPadreAux;
        DELETE FROM ingresosfamiliares WHERE idIngresosFamiliares = idIngresosFamiliaresAux;
        DELETE FROM servicios WHERE idServicios = idServiciosAux;
        DELETE FROM requisitosadicionales WHERE idRequisitosAdicionales = idRequisitosAdicionalesAux;
        
    END;;
|
