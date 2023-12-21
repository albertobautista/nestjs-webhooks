import { Injectable } from '@nestjs/common';
import {
  GithubEvent,
  GithubIssue,
  GithubPayload,
} from 'src/interface/github.interfaces';
import { DiscordService } from 'src/services/discord.service';

@Injectable()
export class GithubService {
  constructor(private readonly discordService: DiscordService) {}
  public async handlePayload(event: GithubEvent, payload: GithubPayload) {
    console.log('Received event', event);
    let message = '';
    switch (event) {
      case 'star':
        message = this.handleStar(payload);
        break;
      case 'issues':
        message = this.handleIssues(payload as GithubIssue);
        break;

      default:
        message = 'Event not found';
    }
    console.log(message);
    await this.discordService.notify(message);
  }
  private handleStar(payload: GithubPayload) {
    const { action, sender, repository } = payload;
    return `User ${sender.login} ${action} star on ${repository.full_name}`;
  }

  private handleIssues(payload: GithubIssue): string {
    const { action, sender, issue } = payload;

    if (action === 'opened') {
      return `An issue was opened with this ${issue.title} by ${sender.login}`;
    }
    if (action === 'closed') {
      return `An issue was closed by ${issue.user.login}`;
    }
    if (action === 'edited') {
      return `An issue was edited by ${issue.user.login}`;
    }
    if (action === 'deleted') {
      return `An issue was deleted by ${issue.user.login}`;
    }
    if (action === 'reopened') {
      return `An issue was reopened by ${issue.user.login}`;
    }
    return `Unhandled action for the issue event ${action}`;
  }
}
