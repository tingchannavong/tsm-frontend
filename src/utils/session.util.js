export function mapSessionIdsFromGroup(groupSessions) {
  const sessionIds = groupSessions.flatMap((sameStart) =>
    sameStart.items.map((session) => session.id),
  );

  return sessionIds;
}

// sort table
// filter etc.
