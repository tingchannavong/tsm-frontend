export function mapSessionIdsFromGroup(groupSessions) {
  const sessionIds = groupSessions.map((sameStart) =>
    sameStart.items.map((session) => session.id),
  );

  return sessionIds;
}

// sort table
// filter etc.
