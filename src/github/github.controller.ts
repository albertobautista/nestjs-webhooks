import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubEvent, GithubPayload } from 'src/interface/github.interfaces';
import { GithubGuard } from 'src/guards/github.guard';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Post()
  @UseGuards(GithubGuard)
  webhookHandler(
    @Headers('x-github-event') githubEvent: GithubEvent,
    @Headers('X-Hub-Signature-256') signature: string,
    @Body() body: GithubPayload,
  ) {
    this.githubService.handlePayload(githubEvent, body);
    return { githubEvent };
  }
}
