import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {
  private readonly discordWebhookUrl: string =
    'https://discord.com/api/webhooks/1187469753804132402/ciQ3RyJqFfOyGL8hFreMmDiDeX0Dcjl2iZRTnelNio2S6etF_ubEBE7C3tkrsECUrDM0';

  async notify(message: string) {
    console.log('Sending message to Discord', message);
    const body = {
      content: message,
    };
    const response = await fetch(this.discordWebhookUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.log('Error sending message to Discord');
      return false;
    }
    return true;
  }
}
