const parseGitHubResponse = (response = {}) =>
  response.items?.reduce(
    (repositories, item) => [
      ...repositories,
      {
        id: item.id,
        fullName: item.full_name,
        language: item.language,
        createdAt: item.created_at,
        owner: {
          login: item.owner.login,
          avatarUrl: item.owner.avatar_url,
          url: item.owner.url,
        },
      },
    ],
    []
  );

export const searchGitHub = async (searchPhrase = '') => {
  const params = new URLSearchParams({ q: searchPhrase });

  const response = await fetch(`https://api.github.com/search/repositories?${params}`);
  const jsonResponse = await response.json();
  const repositories = parseGitHubResponse(jsonResponse);

  return repositories;
};
