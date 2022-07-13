function salir() {
	var respuesta = confirm("¿Seguro que desea salir?");
	if (respuesta == true) {
		return true;
	}
	else {
		return false;
	}
}

