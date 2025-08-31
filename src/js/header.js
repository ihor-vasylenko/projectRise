import { refs } from "./refs";

function toggelModal() {
	refs.modalMenuMobile.classList.toggle('isActive');
	refs.bodyLock.classList.toggle('lock');
}
export function mobileMenu() {
	refs.openMenuMobile.addEventListener('click', toggelModal);
	refs.closeMenuMobile.addEventListener('click', toggelModal);
	refs.bodyUnlock.addEventListener('click', () => {
	refs.bodyLock.classList.remove('lock');
	refs.modalMenuMobile.classList.remove('isActive');
});	
}
