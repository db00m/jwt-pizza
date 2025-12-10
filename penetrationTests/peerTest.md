
**Participants:** David Bloomfield, Matthew Nelson

## Self Attack

### David

| Item           | Result                                                                   |
| -------------- | ------------------------------------------------------------------------ |
| Date           | Dec, 8, 2025                                                             |
| Target         | pizza.dbl00m11.click                                                     |
| Classification | Broken Access Control                                                    |
| Severity       | 2                                                                        |
| Description    | Improper admin access, deleted all users and franchises.                 |
| Corrections    | Protect admin creation.                                                  |

## Matthew

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 4, 2025 |
| Target         | pizza.msn510.click |
| Classification | Security breach |
| Severity       | 3 |
| Description    | Any customer account could be accessed without a password |
| Corrections    | Require passwords on the backend. |

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 4, 2025 |
| Target         | pizza.msn510.click |
| Classification | Avoiding Payment |
| Severity       | 3 |
| Description    | Users could change the price of their pizza/order. |
| Corrections    | Base the order price amount on the databse rather than what's passed from the frontend. |

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 4, 2025 |
| Target         | pizza.msn510.click |
| Classification | Deleting Data |
| Severity       | 1 |
| Description    | Any user could delete franchises |
| Corrections    | Add admin check to the delete franchise endpoint. |

## Peer Attack

### David
#### Created Admin

| Item           | Result                                                   |
| -------------- | -------------------------------------------------------- |
| Date           | Dec 9, 2025                                              |
| Target         | pizza-service.msn510.click                               |
| Classification | Broken Access Control                                    |
| Severity       | 2                                                        |
| Description    | Improper admin access, deleted all users and franchises. |
| Corrections    | Protect admin creation.                                  |

#### Logged into Factory

| Item           | Result                                                                                                                                           |
| -------------- |--------------------------------------------------------------------------------------------------------------------------------------------------|
| Date           | Dec 9, 2025                                                                                                                                      |
| Target         | pizza-service.msn510.click                                                                                                                       |
| Classification | Broken Access Control                                                                                                                            |
| Severity       | 2                                                                                                                                                |
| Description    | Factory API key was in config file in artifact.  Gave me access to Matthew's factory account.  With this access I was able to enable chaos mode. |
| Corrections    | Don't write config file in build step, or hide credentials in artifact.                                                                          |

### Matthew

| Item           | Result         |
| -------------- | ------------------------------------------------------------------------------ |
| Date           | December 9, 2025 |
| Target         | https://pizza.dbl00m11.click/ |
| Classification | Security breach |
| Severity       | 3 |
| Description    | Any customer account could be accessed without a password |
| Corrections    | Require passwords on the backend. |

| Item           | Result                                                                                  |
| -------------- | --------------------------------------------------------------------------------------- |
| Date           | December 9, 2025                                                                        |
| Target         | pizza.dbl00m11.click                                                                    |
| Classification | Avoiding Payment                                                                        |
| Severity       | 3                                                                                       |
| Description    | Users could change the price of their pizza/order.                                      |
| Corrections    | Base the order price amount on the databse rather than what's passed from the frontend. |

| Item           | Result                                            |
| -------------- | ------------------------------------------------- |
| Date           | December 9, 2025                                  |
| Target         | pizza.dbl00m11.click/                             |
| Classification | Deleting Data                                     |
| Severity       | 1                                                 |
| Description    | Any user could delete franchises                  |
| Corrections    | Add admin check to the delete franchise endpoint. |

## Leanrings

### Matthew
1. Ensure that your GitHub secrets aren't being saved into any file.
2. Every endpoint needs to be covered by middleware and have backend verification. Frontend verification is just to improve the UX.
3. Add as many layers of security as possible.
    - Make your GitHub repositories private.
    - Restrict access to everything as much as possible (e.g. AWS roles).

### David
It's important to check every place credentials are used and make sure they are not stored in plain text anywhere.  It may be easy to assume that credentials are safe if they are used via a secret manager, but it's important to remember that secret manager calls will resolve to the plain text credential.   The biggest lesson I learned was never to assume that data is protected, we as DevOps engineers need to make an effort to ENSURE that sensitive data and credentials are protected.