/**
 * Reset confirmation form.
 *
 * @param confirmationText {ref<string>} The confirmation form text.
 * @param confirmationFlag {ref<boolean>} The boolean flag to reset the confirmation form to.
 */
export function resetConfirmationForm(confirmationText, confirmationFlag) {
  confirmationText.value = ''
  confirmationFlag.value = false
}
