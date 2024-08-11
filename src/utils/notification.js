import { useNotification } from '@kyvg/vue3-notification'

/**
 * Create a notification.
 *
 * @param title {string} To be displayed notification title
 * @param notificationText {string} To be displayed notification text
 */
export function createNotification(title, notificationText) {
  const { notify } = useNotification()

  notify({
    title: title,
    text: notificationText
  })
}
