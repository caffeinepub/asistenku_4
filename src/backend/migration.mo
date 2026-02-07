import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldActor = { /* old state */ };
  type NewActor = { /* new state */ };

  public func run(old : OldActor) : NewActor {
    { /* new state fields */ };
  };
};
