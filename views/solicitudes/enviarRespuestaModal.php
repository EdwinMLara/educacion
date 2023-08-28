<div class="modal fade" id="enviarRespuestaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered mw-100" role="document">
        <div class="modal-content container">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitleSolicitud">Respueta Solicitud</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">

                <div class="form-group">
                    <label for="motivo"> Motivo de aceptacion o rechazo</label>
                    <input type="text" name="motivo" class="form-control" placeholder="Respuesta">
                    <div id="validationMotivo" class="invalid-feedback d-block">
                        
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" id="aceptarBecaButton" class="btn btn-primary">Aceptar</button>
                <button type="button" id="rechazarBecaButton" class="btn btn-secondary">Rechazar</button>
            </div>
        </div>
    </div>
</div>