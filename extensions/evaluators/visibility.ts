import { intersectionBy, uniqBy } from "es-toolkit";
import { matchesProperty } from "es-toolkit/compat";
import type { JsonObject, Paths, ValueOf } from "type-fest";

type VisibilityPolicy<
  TWhenObject extends JsonObject,
  TShowObject extends JsonObject & { id: string },
> = {
  when: {
    keyPath: Paths<TWhenObject>;
    value: ValueOf<TWhenObject>;
  }[];
  show: TShowObject[];
};

const defineVisibilityEvaluator =
  <TWhenObject extends JsonObject, TShowObject extends { id: string }>(
    policies: VisibilityPolicy<TWhenObject, TShowObject>[],
  ) =>
  <T extends { id: string }>(context: TWhenObject, resources: T[]) => {
    const visibleResources = [];

    for (const policy of policies) {
      const contextMatchers = policy.when.map(({ keyPath, value }) =>
        matchesProperty(keyPath, value),
      );

      const contextFullMatch = contextMatchers.every((matcher) => matcher(context));

      if (!contextFullMatch) {
        continue;
      }
      const currentVisibleResources = intersectionBy(
        resources,
        policy.show,
        (resource) => resource.id,
      );

      visibleResources.push(...currentVisibleResources);
    }

    return uniqBy(visibleResources, (resource) => resource.id);
  };

export { defineVisibilityEvaluator };
