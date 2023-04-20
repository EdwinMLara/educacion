<div class="modal mt-10" id="modalCorreoVerificacion" tabindex="-10" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Ya hay una solicitud ligada a esta curp</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modalCorreoVerificacion" class="modal-body">
                <div id="alert"></div>
                <p>Tecle la palabra que se ha enviado a su correo</p>
                <div class="form-group mb-4">
                    <input type="text" class="form-control" name="validationKey" placeholder="Palabra de verificacion">
                </div>
            </div>
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary btn-sm m-2" data-dismiss="modal" id="verificar-acepted-button">Verificar</button>
                <button type="button" class="btn btn-secondary btn-sm m-2" data-dismiss="modal" id="verificar-rejected-button">Cancelar</button>
            </div>
        </div>
    </div>
</div>