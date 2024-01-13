import { Routes } from '@angular/router';
import { NoAuthGuard } from './guards/noAuthGuard.guard';
import { AuthGuard } from './guards/AuthGuard.guard';
import { TeamScoreComponent } from './routes/team-score/team-score.component';
import { AuthorizationComponent } from './routes/authorization/authorization.component';
import { LoginComponent } from './routes/login/login.component';

export const routes: Routes = [
    {
    
            path: 'auth',
            canActivate: [NoAuthGuard],
            canActivateChild: [NoAuthGuard],
            data: {
                layout: 'empty',
                expectedRoles: [],
            },
            children: [
                {
                    path: 'sign-in',
                    component: LoginComponent
                },
            ],
    },
    {
        path: 'authorization',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
            expectedRoles: [],
        },
        children: [
            {
                path: '',
                component: AuthorizationComponent
            },
        ],
    },
    {
        path: 'app/user',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
            expectedRoles: ['User'],
        },
        children: [
            {
                path: 'team-score',
                component: TeamScoreComponent
            },
        ],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'auth/sign-in',
    },
];
